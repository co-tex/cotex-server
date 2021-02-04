import { Body, Controller, Get, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { exec } from 'child_process';
import * as fg from 'fast-glob';
import { ProjectsGateway } from './projects.gateway';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private gateway: ProjectsGateway,
        private projectsService: ProjectsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createProject(@Body() body, @Req() req) {
        return this.projectsService.create(req.user, body);
    }
    
    @Get(':id/index')
    getIndex(@Param('id') id) {
        const dir = '/tmp/projects/' + id + '/';
        
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            return {};
        }

        return fg(['**/**'], {
            cwd: dir,
            stats: true,
            ignore: ['/.cotex|.git|node_modules/']
        }).then((files) => {
            const index: any = {};
            files.forEach(file => {
                index[file.path] = {
                    name: file.name,
                    mtime: file.stats?.mtime
                } 
            });
            return index;
        });
    }

    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const dir = '/tmp/projects/' + req.params.id + '/' + req.body.dir;
                
                if(!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                return cb(null,dir);
            },
            filename: (req, file, cb) => {
                return cb(null, file.originalname);
            }
        })
    }))
    uploadFile(@UploadedFile() file) {
       //
    }

    @Post(':id/delete')
    delete(@Param('id') id, @Body() body: [any]) {
        body.forEach((item) => {
            fs.rmSync('/tmp/projects/' + id + 
            (item.dir === '' ? '' : '/' + item.dir) 
            + '/' + item.name, { force: true, recursive: true });
        });
    }

    @Post(':id/compile')
    compile(@Param('id') id,@Body() body){
        const dir = '/tmp/projects/' +  id + '/';
        
        exec("pdflatex " + body.file,
         {cwd: dir}, (error, stdout,stderr) => {
            this.gateway.handleCompile();
        });
    }

    @Get(':id/preview')
    preview(@Param('id') id, @Res() res) {
        res.sendFile('preview.html', { root: __dirname + '/../www' });
    }

    @Get(':id/output')
    output(@Param('id') id, @Res() res, @Query('file') file) {
        res.sendFile('/tmp/projects/' +  id + '/' + file);
    }
}
