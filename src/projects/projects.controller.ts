import { Controller, Get, Header, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { exec } from 'child_process';
import * as fg from 'fast-glob';

@Controller('projects')
export class ProjectsController {

    @Get(':id/index')
    getIndex(@Param('id') id) {
        const dir = '/tmp/projects/' + id + '/';
        const res = {};
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

    @Post(':id/sync')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const dir = '/tmp/projects/' + req.params.id + '/' + req.body.path;
                
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

    @Get(':id/compile')
    //@Header('Content-Type', 'application/pdf')
    //@Header('Content-Disposition', 'attachment; filename=output.pdf')
    compile(@Param('id') id, @Res() res){
        const dir = '/tmp/projects/' +  id + '/';
        exec("latexmk -pdf", {cwd: dir});
        res.sendFile(dir + 'reconstruction.pdf');
    }
}
