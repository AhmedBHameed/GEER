import { Injectable } from '@angular/core';
import { FunctionsService } from './_functions/functions.service';

@Injectable()
export class DataService {

  constructor(private fn: FunctionsService) {  }

  getCategories(sliderCategory){
    return this.fn.makeRequest('categoriesmenu', 'Post', {"id":sliderCategory});
  }
  getSettingData(){
    return this.fn.makeRequest('setting', 'Get');
  }
  getCarouselData(){
    return this.fn.makeRequest('carousel', 'Get');
  }
  getNewPostsData(){
    return this.fn.makeRequest('newposts', 'Get');
  }
  getLastCommantsData(){
    return this.fn.makeRequest('lastcomments', 'Get');
  }
  getCategoryPosts(id: string){
    return this.fn.makeRequest('categoryposts', 'Post', {"id":id});
  }
  postComment(data){
    return this.fn.makeRequest('addcomment', 'Post', data)
  }


  // ========================== Post Page Query =============================
  getPostData(id: string){
    return this.fn.makeRequest('post', 'Post', {"id":id});
  }
  getCommentsData(id:string, page: number, perPage:number){
    return this.fn.makeRequest('viewcomments', 'Post', {"id":id, "page":page, "perPage":perPage});
  }
  
  
}
