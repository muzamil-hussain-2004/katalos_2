import { OnEvent } from "@nestjs/event-emitter";
import { MailService } from "../mail.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PurchaseListner {
  constructor(private mailService: MailService ) {}
   
  @OnEvent('purchase.interested')
  async handlePurchaseInterest(payload: any) {
    const html = `
    <h3> User Intrested in laptop </h3>
    <p>User Name: ${payload.userName}</p>
    <p>Laptop ID: ${payload.laptopId}</p>
    <p>Sale Price: ${payload.salePrice}</p>
    `;

    await this.mailService.sendHrMail(
      `User Intrest in ${payload.laptopId}`,
      html,
    );
  }
}