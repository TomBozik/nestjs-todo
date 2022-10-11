import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
        // const user = await this.prisma.user.findFirst({
        //     where: {
        //         id: payload.sub
        //     }
        // })
        // delete user.password
        // return user;
    }
}