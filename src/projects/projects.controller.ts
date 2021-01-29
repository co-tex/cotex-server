import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as dt from 'directory-tree';
import * as fs from 'fs';

@Controller('projects')
export class ProjectsController {

    @Get(':id/index')
    getIndex(@Param('id') id) {
        const dname = '/tmp/projects/' + id;
        const index = dt(dname, { exclude: /.cotex|.git|node_modules/, attributes: ['mtime'] });
        return index;
    }

    @Post(':id/sync')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }
}
