import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Post } from '../core/interfaces/post.interface';
import { Router } from '@angular/router';
import { PostService } from '../core/service/post.service';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage {
  public post: Post = {};
  private loading: any;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  async register(): Promise<void> {
    await this.presentLoading();
    try {
      const user = this.authService.getCurrentUser();
      console.log(user);
      this.post.user_id = '1';
      this.post.data_criacao = new Date();
      await this.postService.insert(this.post);
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
