# 一个基于egret的MVC

## 解决现阶段问题
- 获取组件实例困难，跨组件交互和通信复杂
- 业务逻辑糅杂在一起，维护火葬场
- bug难定位

## 基本原则
view`只`负责视图更新，model`只`负责存储数据和格式化后端数据，ctrl`只`控制业务逻辑

## view层
基于eui.Component封装了一个BaseComponent，提供了几个简单的生命周期函数，`onCreating` `onCreated` `onShow` `onHide`，在继承这个类的子类里重写这些方法，会在每个生命周期时回调这个函数。
- `onCreating` eui组件的构建中，皮肤中定义了id的组件构造完成时会走这个方法，这个方法提供两个参数子组件的id，子组件实例，可以在这个方法里对子组件进行额外的初始化操作，比如监听事件
- `onCreated` 组件构建完成，组件的构造是个异步过程
- `onShow` 被添加到舞台时的回调，省去每次重复写大段的监听代码
- `onHide` 被移除舞台，是个
- `ondestroyed`（待完成） 被销毁，暂时没有想到好的实现

还封装了一个通用fillContainer工具方法，用来填充父容器

``` ts
class BaseComponent extends eui.Component {
    constructor() {
        super();
        this.initHooks();
    }
    protected initHooks() {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
        // this.addEventListener('COMPONENT_DESTROYED', this.onDestroyed, this);
    }

    protected childrenCreated() {
        super.childrenCreated();
        this.onCreated();
    }
    protected partAdded(partName: string, instance: any) {
        super.partAdded(partName, instance);
        this.onCreating(partName, instance);
    }
    /**
     * 组件初始化时 部件被添加时调用，子类覆盖
     * 用于添加部件事件监听 设置属性
     */
    protected onCreating(partName: string, instance: any) {
    }
    /**
     * 组件初始化完成 被添加至舞台时调用，子类覆盖
     */
    protected onCreated() {
    }
    protected onShow() {
    }
    /**
     * 从父组件移除前执行
     * 
     */
    protected async onHide() {
        return Promise.resolve();
    }
    protected onDestroyed() {
        // TODO
    }

    onUpdated() {
    }
    /**
     * 从父组件移除
     * 
     */
    async hide() {
        await this.onHide();
        return Tools.removeFromParent(this);
    }
    /**
     * 重新设置组件的宽高，使之与容器保持一致
     * @param compoment
     * @param container
     * 
     */
    fillContainer(compoment: egret.DisplayObject, container: egret.DisplayObjectContainer = null): void {
        if (!container) container = compoment.parent;
        if(container) {
            let {width, height} = container;
            Object.assign(compoment, {width, height});
        } else {
            egret.warn(`传入容器不为空或${compoment.name}必须先加入父容器`)
        }
    }
}
```

一个view的栗子，view只负责初始化，提供修改视图的方法，具体业务逻辑不出现在view内：

``` ts
class ChildView extends XhGame.BaseComponent{
    constructor() {
        super();
        this.name = 'ChildViewName';
        this.skinName = "ChildViewSkin";
    }
    onCreating(partName: string, instance: egret.DisplayObject) {
        this[partName] = instance;
        switch (partName) {
            case 'btnClose':
                instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                break;
            case 'item1':
                this.initItem1(<eui.Group>instance);
                break;
            case 'item2':
                this.initItem2(<eui.Group>instance);
                break;
            default:
                break;
        }
    }
    onCreated() {
        // 创建后 只回调一次
    }
    onShow() {
        this.fillContainer(this);
    }

    async onHide() {
        // dosomething onHide
    }

    initItem1(tabview: eui.Group) {
        // dosomething init item1
        // this.item1.addEventListener()
    }
    initItem2(tabview: eui.Group) {
        // dosomething init item2
    }
    /**
     * 提供方法给ctrl设置更新视图
     * */
    updateItem1(data) {
      // dosomething set item1
    }
    public item1:eui.Group;
    public item2:eui.Group;
    public item3:eui.Group;
    
    public btnClose:eui.Group;

}
```

## Model层
数据仓库
- 构造时添加默认值，这样的好处是后台没有的时候自己可以mock一些数据，ctrl在调用的时候保证有值不至于报错。
- 提供数据格式化方法，在拿到后台数据时不一定是我们想要的格式，处理后台数据
- 根据复杂情况，使用属性的getter和setter
- Model只负责提供格式化的数据，后台的数据格式化工作在这里处理

``` ts
class ChildViewModel{
    constructor() {
        // 默认值赋值
        this.countdown = 0;
        this._checkinInfoArr = [];
        this._prizeinfoArr = []
    }
    proto1: string;
    proto2: number;
    // ...more proto
    proto1DataFormat(data) {
      // 格式化data
    }
}
```

## ctrl层
控制器业务层
- 单例, 业务之间调用ctrl而不view或者model
- 控制器同时包含view的实例和model的实例，在控制器内处理业务逻辑代码会更清晰
- 由视图触发的逻辑可以通过事件抛到ctrl来处理，比如点击，视图只处理视图的显示逻辑
- ctrl负责与后台交互数据,处理业务逻辑，交给model格式化数据和更新model，然后调用对应view更新的方法，view更新视图

``` ts
class ChildViewCtrl{
    private static _instance: ChildViewCtrl;
    constructor() {
        if(ChildViewCtrl._instance) throw `ChildViewCtrl cannot use new operator`;
        ChildViewCtrl._instance = this;
    }
    static get instance() {
        if(!ChildViewCtrl._instance) {
            new ChildViewCtrl();
            ChildViewCtrl._instance.model = new ChildViewModel();
        }
        return ChildViewCtrl._instance;
    }
    // view
    view: ChildView;
    // more view ...

    // model
    model: ChildViewModel;
    // more model ...

    // Event
    /** 事件B */
    static EVENT_A = "EVENT_A";
    /** 事件A */
    static EVENT_B = "EVENT_B";

    /** 主界面 */
    async show(container: egret.DisplayObjectContainer) {
        if (!this.view) {
            // load res
            await RES.getResAsync('XXX_json');
            this.view = new ChildView();
            
            // addEventListener
            this.view.addEventListener(BzPrizeCenterCtrl.EVENT_A, this.onEventA, this);
            this.view.addEventListener(BzPrizeCenterCtrl.EVENT_B, this.onEventB, this);
        }
        // 更新model
        await this.fetchData();
        // 更新view
        this.setViewInfo();
        // 添加到父容器
        container.addChild(this.view);
    }
    /** 拉后台数据 */
    async fetchData() {
        let promise1 = this.loadInitData1();
        let promise2 = this.loadInitData2();
        return await Promise.all([promise1, promise2]);
    }
    async loadInitData1() {
        try {
            let {data} = await Service.getData1();
            // 调用model的格式化方法格式化数据，同时更新model
            this.model.initDateFormat1(data);
        } catch (error) {
            console.log(error);
        }
    }
    async loadInitData2() {
        try {
            let {data} = await Service.getData2();
            // 调用model的格式化方法格式化数据，同时更新model
            this.model.initDateFormat2(data);
        } catch (error) {
            console.log(error);
        }
    }
    /** 更新view */
    setViewInfo() {
      let data = this.model.proto;
      // 业务逻辑
      this.view.updateItem1(data);
    }
}
```
