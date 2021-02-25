import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {
  public componentDestroyed: Subject<boolean> = new Subject();
  public title = 'levvel-starter-angular';

  constructor(private metaTagService: Meta, private titleService: Title) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Company - Home');
    this.metaTagService.updateTag({
      name: 'description',
      content: 'Company - Home Screen',
    });
    this.metaTagService.updateTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }
}
