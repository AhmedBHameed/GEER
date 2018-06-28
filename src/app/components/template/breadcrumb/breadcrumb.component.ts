import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';

interface IBreadcrumb {
  label: string,
  params?: Params,
  url: string
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {


  breadcrumbs: IBreadcrumb[] = [];
  showMap: boolean;
  cash: string;

  constructor(private activateRoute: ActivatedRoute, private router: Router) { }

  getBreadcrumbs(route: ActivatedRoute, url: string='', breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    
    let children: ActivatedRoute[] = route.children;
    if(children.length === 0){
      return breadcrumbs;           // IT WILL RETURN EMPTY IN CASE NO CHILDREN
    }
    for(let child of children){
      
      
      if(child.outlet !== PRIMARY_OUTLET || this.cash == child.snapshot.data[ROUTE_DATA_BREADCRUMB]){
        continue;
      }
        
      this.cash = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      if(!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)){
        return this.getBreadcrumbs(child, url, breadcrumbs)
      }
      let routeURL : string = child.snapshot.url.map(segment => segment.path).join('/');
      url += `/${routeURL}`;

      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url
      };
      breadcrumbs.push(breadcrumb);      
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( () => {
      let root: ActivatedRoute = this.activateRoute.root;      
      this.breadcrumbs = this.getBreadcrumbs(root);      
    });
  }

}
