# 协程

协程是一种编程思想，具体实现就是一套线程封装的 API

[摘自]: https://rengwuxian.com/kotlin-coroutines-1/

### 基本使用

##### 创建协程

```kotlin
// 方法一，使用 runBlocking 顶层函数
runBlocking {
    getImage(imageId)
}

// 方法二，使用 GlobalScope 单例对象
//            👇 可以直接调用 launch 开启协程
GlobalScope.launch {
    getImage(imageId)
}

// 方法三，自行通过 CoroutineContext 创建一个 CoroutineScope 对象
//                                    👇 需要一个类型为 CoroutineContext 的参数
val coroutineScope = CoroutineScope(context)
coroutineScope.launch {
    getImage(imageId)
}
```

- 方法一通常适用于单元测试的场景，而业务开发中不会用到这种方法，因为它是线程阻塞的。
- 方法二和使用 `runBlocking` 的区别在于不会阻塞线程。但在 Android 开发中同样不推荐这种用法，因为它的生命周期会和 app 一致，且不能取消。
- 方法三是比较推荐的使用方法，我们可以通过 `context` 参数去管理和控制协程的生命周期（这里的 `context` 和 Android 里的不是一个东西，是一个更通用的概念，会有一个 Android 平台的封装来配合使用）

完成例子

```kotlin
🏝️
coroutineScope.launch(Dispatchers.Main) {   // 在主线程开启协程
    val user = api.getUser() // IO 线程执行网络请求
    nameTv.text = user.name  // 主线程更新 UI
}
```

后一个请求依赖前一个请求

```kotlin
🏝️
coroutineScope.launch(Dispatchers.Main) {       // 开始协程：主线程
    val token = api.getToken()                  // 网络请求：IO 线程
    val user = api.getUser(token)               // 网络请求：IO 线程
    nameTv.text = user.name                     // 更新 UI：主线程
}
```

直接把两个并行请求写成上下两行，最后再把结果进行合并

```kotlin
🏝️
coroutineScope.launch(Dispatchers.Main) {
    //            👇  async 函数之后再讲
    val avatar = async { api.getAvatar(user) }    // 获取用户头像
    val logo = async { api.getCompanyLogo(user) } // 获取用户所在公司的 logo
    val merged = suspendingMerge(avatar, logo)    // 合并结果
    //                  👆
    show(merged) // 更新 UI
}
```

##### 使用协程

这个 `launch` 函数，它具体的含义是：我要创建一个新的协程，并在指定的线程上运行它

```kotlin
launch(Dispatchers.IO) {
    val image = getImage(imageId)
}
```

需要切线程或者指定线程的时候

```kotlin
coroutineScope.launch(Dispatchers.IO) {
    val image = getImage(imageId)
    launch(Dispatchers.Main) {
        avatarIv.setImageBitmap(image)
    }
}
```

这样就成了嵌套。有一个很实用的函数：`withContext` 。这个函数可以切换到指定的线程，并在闭包内的逻辑执行结束之后，自动把线程切回去继续执行。

```kotlin
🏝️
coroutineScope.launch(Dispatchers.Main) {      // 👈 在 UI 线程开始
    val image = withContext(Dispatchers.IO) {  // 👈 切换到 IO 线程，并在执行完成后切回 UI 线程
        getImage(imageId)                      // 👈 将会运行在 IO 线程
    }
    avatarIv.setImageBitmap(image)             // 👈 回到 UI 线程更新 UI
} 
```

可以把 `withContext` 放进一个单独的函数里面

```kotlin
🏝️
launch(Dispatchers.Main) {              // 👈 在 UI 线程开始
    val image = getImage(imageId)
    avatarIv.setImageBitmap(image)     // 👈 执行结束后，自动切换回 UI 线程
}
//                               👇
fun getImage(imageId: Int) = withContext(Dispatchers.IO) {
    ...
}
```

如果只是这样写，编译器是会报错的

```kotlin
🏝️
fun getImage(imageId: Int) = withContext(Dispatchers.IO) {
    // IDE 报错 Suspend function'withContext' should be called only from a coroutine or another suspend funcion
}
```

`withContext` 是一个 `suspend` 函数，它需要在协程或者是另一个 `suspend` 函数中调用。

##### suspend 关键字

`suspend` 是 Kotlin 协程最核心的关键字，几乎所有介绍 Kotlin 协程的文章和演讲都会提到它。它的中文意思是「暂停」或者「可挂起」。如果你去看一些技术博客或官方文档的时候，大概可以了解到：「代码执行到 `suspend` 函数的时候会『挂起』，并且这个『挂起』是非阻塞式的，它不会阻塞你当前的线程。」

上面报错的代码，其实只需要在前面加一个 `suspend` 就能够编译通过

```kotlin
🏝️
//👇
suspend fun getImage(imageId: Int) = withContext(Dispatchers.IO) {
    ...
}
```

大部分情况下，我们都是用 `launch` 函数来创建协程，其实还有其他两个函数也可以用来创建协程：

- `runBlocking`
- `async`

`runBlocking` 通常适用于单元测试的场景，而业务开发中不会用到这个函数，因为它是线程阻塞的。

接下来我们主要来对比 `launch` 与 `async` 这两个函数。

- 相同点：它们都可以用来启动一个协程，返回的都是 `Coroutine`，我们这里不需要纠结具体是返回哪个类。
- 不同点：`async` 返回的 `Coroutine` 多实现了 `Deferred` 接口。

关于 `Deferred` 它的意思就是延迟，也就是结果稍后才能拿到。

我们调用 `Deferred.await()` 就可以得到结果了。

接下来我们继续看看 `async` 是如何使用

```kotlin
🏝️
coroutineScope.launch(Dispatchers.Main) {
    //                      👇  async 函数启动新的协程
    val avatar: Deferred = async { api.getAvatar(user) }    // 获取用户头像
    val logo: Deferred = async { api.getCompanyLogo(user) } // 获取用户所在公司的 logo
    //            👇          👇 获取返回值
    show(avatar.await(), logo.await())                     // 更新 UI
}
```

可以看到 avatar 和 logo 的类型可以声明为 `Deferred` ，通过 `await` 获取结果并且更新到 UI 上显示。

`await` 函数签名如下：

```kotlin
🏝️
public suspend fun await(): T
```

Kotlin

前面有个关键字是之前没有见过的 —— `suspend`

## 「挂起」的本质

`launch` ，`async` 或者其他函数创建的协程，在执行到某一个 `suspend` 函数的时候，这个协程会被「suspend」，也就是被挂起。

**挂起的对象是协程**，启动一个协程可以使用 `launch` 或者 `async` 函数，协程其实就是这两个函数中闭包的代码块。

`launch` ，`async` 或者其他函数创建的协程，在执行到某一个 `suspend` 函数的时候，这个协程会被「suspend」，也就是被挂起。

suspend 是有暂停的意思，但我们在协程中应该理解为：当线程执行到协程的 suspend 函数的时候，暂时不继续执行协程代码了。

此时线程和协程是两个部分在分别执行：

**线程：**

如果它是一个后台线程：

- 要么无事可做，被系统回收
- 要么继续执行别的后台任务

它是 Android 的主线程，那它接下来就会继续回去工作：也就是一秒钟 60 次的界面刷新任务。

**协程：**

协程会从这个 `suspend` 函数开始继续往下执行，不过是在**指定的线程**，谁指定的？是 `suspend` 函数指定的，比如我们这个例子中，函数内部的 `withContext` 传入的 `Dispatchers.IO` 所指定的 IO 线程

`Dispatchers` 调度器，它可以将协程限制在一个特定的线程执行，或者将它分派到一个线程池，或者让它不受限制地运行

常用的 `Dispatchers` ，有以下三种：

- `Dispatchers.Main`：Android 中的主线程
- `Dispatchers.IO`：针对磁盘和网络 IO 进行了优化，适合 IO 密集型的任务，比如：读写文件，操作数据库以及网络请求
- `Dispatchers.Default`：适合 CPU 密集型的任务，比如计算

我们的协程原本是运行在**主线程**的，当代码遇到 suspend 函数的时候，发生线程切换，根据 `Dispatchers` 切换到了 IO 线程；当这个函数执行完毕后，线程又切了回来，「切回来」也就是协程会帮我再 `post` 一个 `Runnable`，让我剩下的代码继续回到主线程去执行。

**挂起函数在执行完成之后，协程会重新切回它原先的线程**。

## suspend 的意义？

这个 `suspend` 关键字，既然它并不是真正实现挂起，那它的作用是什么？

**它其实是一个提醒。**

### 什么时候需要自定义 suspend 函数

如果你的某个函数比较耗时，也就是要等的操作，那就把它写成 `suspend` 函数。这就是原则。

耗时操作一般分为两类：I/O 操作和 CPU 计算工作。比如文件的读写、网络交互、图片的模糊处理，都是耗时的，通通可以把它们写进 `suspend` 函数里。

另外这个「耗时」还有一种特殊情况，就是这件事本身做起来并不慢，但它需要等待，比如 5 秒钟之后再做这个操作。这种也是 `suspend` 函数的应用场景。

### 具体该怎么写

给函数加上 `suspend` 关键字，然后在 `withContext` 把函数的内容包住就可以了。

提到用 `withContext`是因为它在挂起函数里功能最简单直接：把线程自动切走和切回。

当然并不是只有 `withContext` 这一个函数来辅助我们实现自定义的 `suspend` 函数，比如还有一个挂起函数叫 `delay`，它的作用是等待一段时间后再继续往下执行代码。

使用它就可以实现刚才提到的等待类型的耗时操作：

```kotlin
🏝️
suspend fun suspendUntilDone() {
  while (!done) {
    delay(5)
  }
}
```

什么是挂起？**挂起，就是一个稍后会被自动切回来的线程调度操作。**

#### 协程是什么

- 协程就是切线程；
- 挂起就是可以自动切回来的切线程；
- 挂起的非阻塞式指的是它能用看起来阻塞的代码写出非阻塞的操作。
