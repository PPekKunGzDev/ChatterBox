import { FastifyInstance } from "fastify";
import { prisma, UtilsPassword } from '../../../helpers/utils'
import * as JWT from 'jsonwebtoken'
import { config } from "../../../helpers/config";

const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

interface RegisterBody {
    username: string,
    password: string
}

interface LoginBody {
    username: string,
    password: string
}

async function userRoutes(server: FastifyInstance) {

  server.post<{Body: RegisterBody}>('/register', async (req, res) => {
    const { username, password } = req.body;

    if (username.length < 4) {
        return res.send({
            code: 0,
            message: 'ชื่อผู้ใช้ต้องมากกว่า 4 ตัว!'
        })
    }

    // if (!emailRegex.test(email)) {
    //     return res.send({
    //         code: 0,
    //         message: 'รูปแบบอีเมลไม่ถูกต้อง!'
    //     })
    // }

    if (password.length < 8) {
        return res.send({
            code: 0,
            message: 'รหัสผ่านต้องมากกว่า 8 ตัว!'
        })
    }

    try {
        // const checkEmail = await prisma.user.findUnique({ where: { email: email } })
        const checkUserName = await prisma.user.findUnique({ where: { username: username } })
        if (checkUserName) {
            return res.code(409).send({
                message: 'ชื่อผู้ใช้งานหรืออีเมลถูกใช้งานแล้ว',
                code: 409
            })
        }
        const hashPass = await UtilsPassword.genSalt(10, password)
        const createUser = await prisma.user.create({
            data: {
                username: username,
                password: String(hashPass),
            }
        })
        const data = await prisma.user.findFirst({
            where: {
                id: createUser.id
            }
        })
        if (data) {
            data.password = "[PASSWORD]";
        }
        const token = JWT.sign({ id: createUser.id, username: createUser.username }, String(config.APP_JWT_SECRET))

        res.code(200).send({
            code: 200,
            message: 'ทำการสมัครสำเร็จ',
            token,
            data
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            code: 500,
            message: "TRY_AGAIN",
        });
    }
  });
  
  server.post<{Body: LoginBody}>('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { username: username } })
        if (!user) {
            return res.code(401).send({
                message: 'ชื่อผู้ใช้ / รหัสผ่านไม่ถูกต้อง',
                code: 401
            })
        }
        const checkPass = await UtilsPassword.compareHash(user.password, password);
        const checkPass2 = user.username === username;
        if (!checkPass || !checkPass2) {
            return res.code(401).send({
                message: 'ชื่อผู้ใช้ / รหัสผ่านไม่ถูกต้อง',
                code: 401
            })
        }
        user.password = "[PASSWORD]";
        const token = JWT.sign({ id: user.id, username: user.username }, String(process.env.APP_JWT_SECRET))
        res.code(200).send({
            code: 200,
            message: 'ทำการเข้าสู่ระบบสำเร็จ',
            token,
            data: user,
        })
    } catch (err) {
        return res.status(500).send({
            code: 500,
            message: "TRY_AGAIN",
        });
    }
  });

}
  
export default userRoutes;