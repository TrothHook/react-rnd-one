import { Controller, UseGuards } from '@nestjs/common';
import { ResponseService } from 'src/common-service/response.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('')
export class AuthController {
    constructor(
        private responseService: ResponseService,
        private authService: AuthService,
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('api/v1/auth/login')
    login
}
