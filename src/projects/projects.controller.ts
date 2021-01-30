import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as dt from 'directory-tree';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('projects')
export class ProjectsController {

    @Get(':id/index')
    getIndex(@Param('id') id) {
        const dname = '/tmp/projects/' + id;
        const res = {};
        dt(dname, { exclude: /.cotex|.git|node_modules/, attributes: ['mtime'] }, (file, path, stats) => {
            res[file.path.split('/').slice(3).join('/')] = file;
        });
        return res;
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
}
