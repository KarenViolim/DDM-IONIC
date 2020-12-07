import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public userLogin: User = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public keyboard: KeyboardEvent
    ) { }

    async login(): Promise<void> {
      await this.presentLoading();
  
      try {
        await this.authService.login(this.userLogin);
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
