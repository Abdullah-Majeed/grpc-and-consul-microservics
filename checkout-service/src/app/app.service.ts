import { Injectable } from '@nestjs/common';
import Consul from 'consul';
@Injectable()
export class AppService {
  private consul = new Consul({
    host: 'localhost',
    port: 8500
  })

  async discoverAndCallPayment() {
    const services = await this.consul.agent.service.list();
    const paymentInfo = services[`payment-service-3005`];
    if (!paymentInfo) {
      throw new Error('Payment service not found in registery!')
    }
    const address = 'localhost';
    const port = paymentInfo.Port;
    const finalUrl = `http://${address}:${port}/api/health`;
    console.log(`Discovery successful calling ${finalUrl}`)
    return {
      message: 'Service discovered successfully',
      url: finalUrl,
      serviceData: paymentInfo
    }
  }
}
