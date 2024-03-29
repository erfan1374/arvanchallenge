const Index = () => import(/* webpackChunkName: "articles" */ '@/components/articles')
const Create = () => import(/* webpackChunkName: "create article" */ '@/components/articles/create')
const Edit = () => import(/* webpackChunkName: "edit article" */ '@/components/articles/edit')
export default {
  name: 'article',
  path: 'dashboard/articles',
  redirect: 'dashboard/articles',
  meta: {label: 'articles', auth: 'articles'},
  component: {
    render (c) { return c('router-view') }
  },
  children: [
    {
      path: '',
      meta: {label: 'index', auth: true, title: "Articles"},
      component: Index,
      props: true
    },
    {
      path: 'page/:page',
      meta: {label: 'index', auth: true, title: "Articles"},
      component: Index,
      props: true
    },
    {
      path: 'create',
      meta: {label: 'add', auth: true, title: "Create article"},
      component: Create,
      props: true
    },
    {
      path: 'edit/:slug',
      meta: {label: 'edit', auth: true, title: "Edit article"},
      component: Edit,
      props: true
    }
  ]
}
