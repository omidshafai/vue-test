import PanelContainer from './components/PanelContainer.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import Posts from './components/Posts.vue';


const routes = [
    { path: '/', name: 'login', component: Login },
    { path: '/panel', name: 'panel', component: PanelContainer, children: [{
        name: 'dashboard',
        path: '',
        component: Dashboard
      }, {
        name: 'posts',
        path: 'posts',
        component: Posts
      }, 
    //   {
    //     name: 'route.child-one',
    //     path: 'child-one',
    //     component: ChildOneView
    //   }, {
    //     name: 'route.child-two',
    //     path: 'child-two',
    //     component: ChildTwoView
    //   }
    ]
    },
];

export default routes;