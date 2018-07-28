import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare let Prism: any;
@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(html: any, args?: any): any {
    let regexp: RegExp;
    // console.log(html);
    // if (html) {
    //   regexp = new RegExp(/<pre[^>]*>([\s\S]*?)<\/pre>/g);
    //   html = html.replace(regexp, (text: string) => {
    //     let regXp = new RegExp(/<code>(.*?)<\/code>/g);
    //     console.log(regXp.exec(text));
    //     return '<pre class="language-javascript>"<code class="language-javascript">' + Prism.highlight(text, Prism.languages.javascript) + '</code></pre>';
    //   });
    //   console.log('Always called');
    // }
    // Prism
    // console.log(html);

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
