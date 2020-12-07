import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public userRegister: User = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public keyboard: KeyboardEvent
  ) { }

  async register(): Promise<void> {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading(): Promise<void> {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string): Promise<any>  {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
