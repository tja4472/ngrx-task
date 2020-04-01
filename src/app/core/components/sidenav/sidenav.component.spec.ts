import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { authFeatureKey, AuthFeatureState } from '@app/auth';
import { RootStoreModule } from '@app/root-store';
import {
  taskFeatureKey,
  TaskState,
} from '@app/root-store/tasks-store/reducers';
import { UserStoreState } from '@app/root-store/user-store';

import { SidenavComponent } from './sidenav.component';

import { environment } from 'src/environments/environment';

fdescribe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  const authState: Partial<AuthFeatureState> = {
    auth: {
      hasChecked: true,
      isAutoSignIn: true,
      userId: null,
    },
  };

  const taskState: Partial<TaskState> = {
    taskLists: {
      ids: [],
      entities: {},
      loaded: true,
      loading: false,
    },
  };

  const userState: UserStoreState.State = {
    user: null,
    taskListId: null,
  };

  /*  
  const initialState = {
    authFeature: {
      auth: {
        hasChecked: true,
        isAutoSignIn: true,
        userId: 'mcdMeKJiuOSAg8dBQyAwndOMZPF3',
      },
    },
    [taskFeatureKey]: taskState,
    user: {
      user: {
        id: 'mcdMeKJiuOSAg8dBQyAwndOMZPF3',
        email: 'b.b@b.com',
        name: '',
      },
      taskListId: 'Ck8TWzXG5PrXMs3k3sh8',
    },
  };
*/
  const initialState = {
    [authFeatureKey]: authState,
    [taskFeatureKey]: taskState,
    user: userState,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        // RootStoreModule,
        // AngularFireModule.initializeApp(environment.firebase),
        // AngularFirestoreModule,
        // AngularFireAnalyticsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
