
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: false },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/publicaciones', component: () => import('pages/publicaciones.vue') },
      { path: '/registro', component: () => import('pages/registro.vue')},
      { path: '/login', name: 'login', component: () => import('pages/login.vue'), meta: { auth: false } }
    ]
  }
]

export default routes
