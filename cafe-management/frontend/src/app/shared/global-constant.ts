export class GlobalConstant{
    public static genericError:string = "Something went wrong. please try again later.";

    public static nameregx:string = "[a-zA-Z0-9 ]*";

    // public static emailegx:string = "/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";

    public static contactNumberRejx:string = "^[e0-9 ]{10,10}$";

    public static unauthorized = "You anr not authorized to access this page.";

    // variable
    public static error:string = "error";

    public static APIURL = "http://localhost:4000/api/v1";
}
