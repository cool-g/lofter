# Lofter 

- 搜索页、scroll监听防抖优化，
- tabs 和 swiper 联动
- 自定义tabs


## 数据分析
...


## 遇到的问题  
 - 使用 ts 时， 我用`obj['key']` 的方式变量对象时，会报‘object没有找到string类型的’ 的错。  
    因为 foo 作为 object 没有声明 string 类型可用，所以`foo[key]`将会是any类型。  
    > 解决方法：
    >  1. 把对象声明as any，失去 ts 的意义。
    >  2. 给对象声明一个接口 
            ```js
                interface SimpleKeyValueObject {
                    [key: string]: any,
                    ...
                } 
            ```
    > 3. 使用泛型  
            ```js 
                function test<T extends object> (foo: T) {
                for (let key in foo) {
                    console.log(foo[key]); // 报错消失
                    // do something
                }
                }
            ```
    > 4. 使用keyof  
        ```js
            interface Ifoo{
            name: string;
            age: number;
            weight: number;
            }

            function test (opt: Ifoo) {
            let key: (keyof Ifoo);
            for (key in opt) {
                console.log(opt[key]); // 报错消失
                // do something
            }
            }
        ```

- 使用antd走马灯，即swiper的时候，外层tab滑动页面会 滑动到下一页滑动，每个页面中包含轮播图的滑动。在这种嵌套关系中，我希望在滑动页面轮播图的时候不滑动tab页面。
    > 解决方案及原因：  
    两个`swiper`嵌套使用，应该使用不同的类名声明才不会发生冲突，`antd-mobile`库没有更改类声明的方法，我猜想应该是使用的相同类型。于是我将`antd-mobile`库对swiper的使用改为直接使用`swiper`7，这里用到最新版本。这个库对于`swiper`嵌套使用同方向滑动不会冲突，
    - 但是又有新的问题：`swiper`与`tabs`双向绑定的问题，因为版本较新摸索了比较久，解决思路如下：
        - 完成双向绑定关系  
        ```js 
            // 用state保存swiper实例
            const [swiperInstance, setSwiperInstance] = useState<any>();
            // 保存当前activeInde
            const [activeIndex,setActiveIndex] = useState(0)
            <Tabs
            // tabs改变时，将下标更新
            onChange={key => {
                    const index = tabList.findIndex(item => item.key === key)
                    setActiveIndex(index)
                }}
            </Tabs>
            <Swiper>
            // 发生滑动时，将下标动态更新
            onActiveIndexChange={(swiperCore)=>{setActiveIndex(swiperCore.realIndex) }}
            // 非常重要，将swiper保存起来，当tab改变时可以调用里面的 slideTo 方法跳到指定swiper
            onSwiper={(swiper)=>
            setSwiperInstance(swiper)
            }
            </Swiper>
            ```
    - 页面swiper切换的时候，所有页面的高度都以最长的那个页面高度为基准。  
        - 解决方案：
            ```js
            // 解决每个页面高度不一致问题，自适应每个页面的高度
            // 为swiper添加这个属性
            autoHeight={true}
            ```


    - 从后端获取的 推荐标题数据是以html 的格式传过来的，如`<p>标题内容</p>`，如果直接以 { } 形式放置，则会将`html`标签以字符串形式输出。所有要React 解析从后台读取的内容是html格式代码   
        > 解决方案：  
            ```js
                <!-- title 后端传过来的html数据 -->
                <p dangerouslySetInnerHTML = {{ __html:title}}></p>
            ```

    - 自定义swiper下小圆点的颜色，只要更改一下类名：
        ```css
           .swiper-pagination-bullet-active{
                color: #000;
                background: #fff;
            }
        ```

## 使用场景  
- 使用localstorage存储用户设置的主题颜色

- 搜索历史  
    1. 每次加历史记录从数组头部加，用**unshift**  
    2. 每次加历史记录的时候做**数组去重**工作

- 搜索记录 类似 URL缓存 队列
    1. 使用数组每次搜索一条数据用`unshift`从数组头部加入字符
    2. 为了控制记录数量，加入之前判断数组是否存满，是则从数组尾部去除一个数据，再从头部加入新数据
    3. 相同搜索出现只存一次，通过`Array.from(new Set(arr))`对数组去重。注意先加入新数据再去重，这样新数据始终保持在最前面
    <!-- 4. 对数据做持久化处理，每次进入搜索页面时，通过useEffect生命周期获取远程数据的同时将LocalStorage中的历史记录读出，存到redux中，之后对历史记录的操作都在redux中进行，在退出搜索页，又通过useEffect.return 生命周期结束函数中，将redux中的历史记录存入LocalStorage -->
    4. 以上目前存在一些bug，暂时改为，每次添加搜索历史时改变redux的`state`的同时改变`localstorage`的内容，清空也是如此。


- 对夜间模式/白天模式的`model`数据同样做持久化处理，改变时存入localstorage, redux 初始化时 model的值从localStorage中取出，默认白天模式

- 对于页面滑到特定高度，显示不同的效果；如首页的搜索按钮，只有页面滑下去的时候显示。  
    1. 当加载页面时使用生命周期将scroll监听挂载到window上
    2. 当页面离开时，利用useEffect生命周期结束return ,取消scroll监听
    3. 防抖处理，用`debounce`包裹，0.5s
    4. 处理事件用`useCallback`包裹，提高性能

    ```js
          const [showSearch,setShowSearch] = useState(false)

        // 使用useCallback，外层组件每次更新都复用上次函数
        const setScroll = useCallback(()=>{
            if (window.pageYOffset > 100) { // 100 为页面滚到的位置，可自定义
                setShowSearch(true)
            } else {
                setShowSearch(false)
            }
        },[])

        useEffect(()=>{
            navigate(`/home/find`)
            // 监听页面滚动 加上防抖处理，避免频繁触发
            window.document.addEventListener('scroll',debounce(setScroll,500))
            // 退出页面时 销毁监听
            return () => {
            window.removeEventListener("scroll", setScroll);
            };
        },[])
    ```

- 使用 dnd-kit 实现拖拽自定义导航顺序

- 瀑布流 + 无限滚动
瀑布流使用flex实现，
之前使用column存在bug，因为column:2，将容器分为2列，先把左侧排满，再排右侧。在增加数据时，整个排布都会打乱，浏览器重排性能不好、用户体验极差。  
因此这个改为flex实现，将容器分为左右两列，并将数据根据图片的高度均匀的分到左右两个数组中