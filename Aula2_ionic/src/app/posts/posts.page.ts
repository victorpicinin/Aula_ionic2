import { Component, OnInit } from '@angular/core';
import { PostServicesService } from '../post-services.service'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  postsArr :any;
  Postspage: any[]
  private index:number = 0;
  private readonly offset:number = 15;

  constructor(private postServices:PostServicesService) { }

  async ngOnInit() {
    let response = await this.postServices.getPosts()
    this.postsArr = response
    
    this.Postspage = this.postsArr.slice(this.index,this.offset+this.index);
    this.index += this.offset;
  }

  loadData(event) {
    setTimeout(() => {
      let newPosts =  this.postsArr.slice(this.index,this.offset+this.index);
      this.index += this.offset;
      for(let i=0;i<newPosts.length;i++){
        this.Postspage.push(newPosts[i]);
      }
      console.log('Done');
      event.target.complete();

    
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.Postspage.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
