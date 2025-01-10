import 'next-auth'

declare module 'next-auth' {
    interface User{
        id?:string,
        name:string
        email:string,
        image?:string,
    }

    interface Session{
        user: {
            id?:string,
            name:string
            email:string,
            image?:string,
        } & DefaultSession['user']; //isse atleast key aajayeg,empty ki vjh se error through nhi krega
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?:string,
        name:string
        email:string,
        image?:string,
    }
}