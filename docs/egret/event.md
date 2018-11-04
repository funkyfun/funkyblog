---
{
"title": "egret事件机制",
"description": "egret事件机制",
}
---
# egret事件机制

## egret事件的实现
从[Api](http://developer.egret.com/cn/apidoc/)文档可以看出，所有的类基本都是按照 ...=>`egret.EventDispatcher` => `egret.HashObject`的继承路径。

（HashObject是所有egret类的基类，作用是在每个对象初始化的时候给对象加一个hash值，这个hash值是一个全局自增的id值）

所有的显示对象都是继承了EventDispatcher，根据这点和命名可以隐约看出这个类是egret事件机制的关键。

根据Api暴露的方法可以看出和[EventEmitter](https://github.com/primus/eventemitter3)很像。

```ts
class EventDispatcher extends HashObject implements IEventDispatcher {
  // public
  addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;

  once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;

  removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;

  hasEventListener(type: string): boolean;

  willTrigger(type: string): boolean;

  dispatchEvent(event: Event): boolean;

  dispatchEventWith(type: string, bubbles?: boolean, data?: any, cancelable?: boolean): boolean;

  // private
  constructor(target?: IEventDispatcher);

  $EventDispatcher: Object;

  $getEventMap(useCapture?: boolean): any;

  $addListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): void;
  
  $insertEventBin(list: any[], type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): boolean;
  
  $removeEventBin(list: any[], listener: Function, thisObject: any): boolean;

  $notifyListener(event: Event, capturePhase: boolean): boolean;

}

``` 

同样和dom的事件监听方式也很像，是一个典型的监听者模式，先注册(addEventListener)对应事件类型（type）的回调，当有事件派发（dispatch）时触发注册的事件回调。

### construct
先从构造函数开始，当`new`一个显示对象的时候，会调用父类`EventDispatcher`的构造函数，这时候会在当前显示对象上挂载一个属性名$EventDispatcher的对象。
```js
// Keys的枚举代表$EventDispatcher对应的key
const enum Keys{
    eventTarget,
    eventsMap,
    captureEventsMap,
    notifyLevel
}
class EventDispatcher extends HashObject implements IEventDispatcher {
  public constructor(target:IEventDispatcher = null) {
    super();
    this.$EventDispatcher = {
      0: target ? target : this,
      1: {},
      2: {},
      3: 0
    };
  }
}
```
- eventTarget：显示对象自身的引用
- eventsMap：当前对象监听的事件列表对象
- captureEventsMap：同eventsMap，eventsMap包含冒泡阶段的事件列表，captureEventsMap包含捕获阶段的事件列表
- notifyLevel：处理事件函数的优先级

### addEventListener/once
往显示对象上注册事件监听，这个过程中会在$EventDispatcher属性上的eventsMap和captureEventsMap（取决于useCapture参数）上缓存事件的一些属性。目的是当事件派发时执行相应的回调。
addEventListener和once的区别在于addEventListener注册的事件如果不主动remove的话会一直监听，而once注册的事件在被执行一次后会从监听的事件列表中移除。
同一个显示对象的同一个type的事件的同一个事件的执行者（thisobj）的一个事件回调（listener）在同一个事件阶段（捕获/冒泡）只能监听一次。

### dispatchEvent
事件的流向载体是显示列表，也就是egret的parent和child关系。
todo

### dispatchEvent和dispatchEventWith
todo

### evenBus跨组件通信
todo

## 事件机制的注意点
- 事件类型为字符串类型，容易造成冲突，事件类型尽量集中统一定义，通过业务加不同的前缀，规避和引擎定义的类型冲突。

- 事件注册的监听函数的执行者（thisobj）可能是其他对象，被引用的对象如果在从显示列表移除且希望被垃圾回收，这个时候还需要remove掉之前挂在其他对象上的事件监听，不然不会被gc。

- 事件流是基于显示对象的child和parent关系，如果派发的事件希望被监听到，事件的派发者必须是监听者的child或者自己本身。
