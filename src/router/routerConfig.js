import AsyncComponent from "./asyncComponent";
export const routerConfig = [
    {
        meta: { icon: "profile", expanded: false },
        path: "/article",
        name: "管理",
        hidden: false,
        // main: AsyncComponent(() => import("../components/layout/Layout")),
        children: [
            {
                meta: { expanded: false },
                main: AsyncComponent(() =>
                    import("@/components/article/Article")
                ),
                path: "/article/table",
                name: "博客管理"
            },
            {
                main: AsyncComponent(() =>
                    import("@/components/article/EditArticle")
                ),
                path: "/article/edit",
                hidden: true,
                name: "发布博客"
            }
        ]
    },
    {
        meta: { icon: "bookmark", expanded: false },
        main: AsyncComponent(() => import("@/components/news/News")),
        path: "/news",
        hidden: false,
        name: "新闻"
    },
    {
        meta: { expanded: false },
        main: AsyncComponent(() => import("@/components/dashBoard/Dashboard")),
        path: "/",
        hidden: true,
        name: "首页"
    }
    // {
    //     path: "/",
    //     main: AsyncComponent(() => import("@/components/layout/Layout")),
    //     children: [
    //         {
    //             meta: { icon: "profile", expanded: false },
    //             path: "/article",
    //             name: "文章",
    //             // main: AsyncComponent(() => import("../components/layout/Layout")),
    //             children: [
    //                 {
    //                     meta: { expanded: false },
    //                     main: AsyncComponent(() =>
    //                         import("@/components/article/Article")
    //                     ),
    //                     path: "/article/table",
    //                     name: "表格"
    //                 }
    //             ]
    //         },
    //         {
    //             meta: { expanded: false },
    //             main: AsyncComponent(() => import("@/components/news/News")),
    //             path: "/news",
    //             name: "新闻"
    //         }
    //     ]
    // },
    // {
    //     path: "/login",
    //     main: AsyncComponent(() => import("@/components/login/index"))
    // },
    // {
    //     path: "*",
    //     main: AsyncComponent(() => import("@/components/common/404"))
    // }
];
