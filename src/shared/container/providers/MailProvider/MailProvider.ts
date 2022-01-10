export interface SendMail{
  to:string
  subject:string
  variables:any
  path:string
}

export interface MailProvider {
  sendMail(data: SendMail):Promise<void>;
}