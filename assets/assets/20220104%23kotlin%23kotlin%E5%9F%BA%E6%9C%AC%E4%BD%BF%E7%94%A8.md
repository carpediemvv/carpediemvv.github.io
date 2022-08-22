# 数据类

Kotlin会根据数据类的主构造函数中的参数将equals()、hashCode()、toString()等固定且无实际逻辑意义的方法自动生成，从而大大简少了开发的工作量。

```kotlin
data class Cellphone(val brand: String, val price: Double)
```

# 单例类

Kotlin在背后自动帮我们创建了一个Singleton类的实例，并且保证全局只会存在一个Singleton实例。

```kotlin
object Singleton {
    fun singletonTest() {
        println("singletonTest is called.")
    }
}
```

# 密封类

可以用来展示类的从属关系，一个密封类可以有多个子类,但它们必须和密封类定义在同一个文件中。

```kotlin
sealed class People
data class Man(val age: Int, val name: String) : People()
data class Women(val age: Int, val name: String) : People()

fun userInfo(person: People): String = when(person) {
    is Man -> person.toString
    is Women -> person.toString
}
```

#### 业务场景：

- 会员身份或用户类型
- 分享或支付类型
- 广告类型
- 网络返回类型（Success，Error，Fail）

# Lambda编程

#### Lambda表达式

Lambda就是一小段可以作为参数传递的代码

```
{参数名1: 参数类型, 参数名2: 参数类型 -> 函数体}
```

#### 集合的函数式API

```kotlin
private fun main() {
        val list = listOf("Apple", "Banana", "Orange", "Pear", "Grape", "Watermelon")
        //val newList = list.map({ fruit: String -> fruit.toUpperCase() })
        //当Lambda参数是函数的最后一个参数时，可以将Lambda表达式移到函数括号的外面
        val newList = list.map(){
            { fruit: String -> fruit.toUpperCase() }
        }
        //如果Lambda参数是函数的唯一一个参数的话，还可以将函数的括号省略。
        val newList2 = list.map{
            { fruit: String -> fruit.toUpperCase() }
        }
        //由于Kotlin拥有出色的类型推导机制，Lambda表达式中的参数列表其实在大多数情况下也不必声明参数类型。
        val newList3 = list.map{
             it.toUpperCase()
        }
        //由于Kotlin内部自定义实例对象为 it，当我们想用别名可以替换为我们想要的名称。
        val newList4 = list.map{
              gg-> gg.toUpperCase()
        }
        for (fruit in newList) {
            println(fruit)
        }

    }
```

#### Java函数式API

如果我们在Kotlin代码中调用了一个Java方法，并且该方法接收一个Java单抽象方法接口参数，就可以使用函数式API。Java单抽象方法接口指的是接口中只有一个待实现方法，如果接口中有多个待实现方法，则无法使用函数式API。



```java
public interface OnClickListener {
     void onClick(View v);
}
```

```kotlin
button.setOnClickListener { v ->
}
```

# 函数

### 普通函数

```kotlin
fun methodName(param1: Int, param2: Int): Int {
      return 0
}
```

### 标准函数

- with 传入需要运行对象进行操作，最后一行代码作为返回值
- run 需要运行对象直接.run进行操作，最后一行代码作为返回值
- apply 需要运行对象.apply进行操作，运行对象作为返回值，可以链式调用

```kotlin
public inline fun <T> T.apply(block: T.() -> Unit): T {//T.()当前T对象内apply{}的花括号中有T的上下文
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block()
    return this
}
```



- let
- also  

```kotlin
public inline fun <T> T.also(block: (T) -> Unit): T {//(T)当前T对象内also{}的花括号中有T的对象引用
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    block(this)
    return this
}
```

- takeIf
- takeUnless
- repeat

### 静态函数

#### 第一种实现

在方法上添加@JvmStatic注解

```kotlin
class Util {
    companion object {
        @JvmStatic
        fun doAction() {
            println("do something")
        }
    }
}
```

#### 第二种实现

写在文件根部

```kotlin
fun doSomething() {
    println("do something")
}
```

### 扩展函数（属性）

- 不修改源码，让原有类 增加函数或属性（原理是ActivityKtx生成一个bindView的静态函数，将Activity对象传递进去，进行操作）
- 扩展函数类的子类不可重写父类扩展函数
- 扩展属性：必须定义get()方法，在Kotlin中类中的属性都是默认添加get()方法的，但是由于扩展属性并不是给现有库中的类添加额外的属性，自然就没有默认get()方法实现之说。所以必须手动添加get()方法。

```kotlin
ActivityKtx.kt//文件名

fun <T : ViewDataBinding> Activity.bindView(@LayoutRes layout: Int): T {//bindView是扩展的函数
    return DataBindingUtil.setContentView(this, layout)
}

val Activity.context: Context//context是扩展的属性    val 只可读
    get() = this

var Activity.context: Context//context是扩展的属性    var 可读可写
    get() = this
    set(value) {}
```

# 高阶函数

如果一个函数接收另一个函数作为参数，或者返回值的类型是另一个函数，那么该函数就称为高阶函数。

原理Lambda表达式是被编译器转换成了java的内部类实现的。为了消除这个开销，使用inline 关键字，它可以将Lambda的代码在编译时直接替换到函数类型调用的地方 

```kotlin
protected inline fun <T : Any> LiveData<T>.observeKt(crossinline block: (T?) -> Unit) {
    this.observe(this@BaseActivity, Observer {
        block(it)
    })
}
```

## noinline与crossinline

### noinline

- 非内联的函数类型参数可以自由的传递给其他任何函数，它是一个真实的参数，而内联的函数类型只能传递给另一个内联函数，因为它是代码替换。
- 内联函数所引用的Lambda表达式是可以使用Return关键字进行函数返回的，非内联函数只能进行当前函数类型返回。写法是return@当前函数类型的名称。

### crossinline

- 在内联函数中内部的Lambda表达式中使用内联函数参数，是编译不通过的。
- 加入crossinline可以关键字，可以编译通过，但是我们无法使用return关键字返回内联函数了，但可以使用内联函数内部的Lambda表达式进行局部返回

# 泛型

### 泛型类

其中T是约定成俗的代表类型字母

```kotlin
class MyClass<T>{
  fun method(param: T):T{
    return param
  }
}
```





### 泛型方法 

```kotlin
class MyClass{
  fun <T> method(param: T):T{
    return param
  }
}
```



# 委托

### 类委托 

### 委托属性































