# mvc

view--->controller--->model--->view

# mvp

view<===>presenter<===>model

# mvvm

View<--->viewModel<===>model







## mvc

```java

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView viewText = findViewById(R.id.text);

        new THttpHelp(this) {
            @Override
            public void initData(String json) {
                String romData = json;
                viewText.setText(romData);
            }

            @Override
            public void initFailure() {

            }
        }.getRom();
    }
}
```



## mvp



View层

```java
public class WorldFragment extends BaseMVPFragment<WorldPresenter> implements WorldContract.View {

    @BindView(R.id.recyclerview)
    RecyclerView recyclerview;


    private Activity activityContext;
    private WorldAdapter worldAdapter;

    @Override
    protected int getLayoutId() {
        return R.layout.fragment_world;
    }

    @Override
    protected void initInjector() {
        activityContext = getActivity();
        mPresenter = new WorldPresenter();
       
    }

    @Override
    protected void initView(@NonNull View view) {
        recyclerview.setAdapter(worldAdapter);
    }

    @Override
    protected void onFirstVisibleLoad() {
        super.onFirstVisibleLoad();
            mPresenter.getWorldListData(uid, lastId);
    }

    @Override
    public void refreshWorldList(List<HomeFeedsBean> data, int feedCount, long lastId) {
        if (worldAdapter != null && data.size() > 0) {
            this.lastId = lastId;
            worldAdapter.addData(data, WorldAdapter.TYPE_RECODE_ITEM);
            worldAdapter.notifyDataSetChanged();
            if (feedCount < 5) {
                //todo 结束
            } else {
                //todo 加载中
            }
        }
    }

}
```

presenter层

```java
public class WorldPresenter extends BasePresenter<WorldContract.View> implements WorldContract.Presenter {

    @Override
    @SuppressLint("CheckResult")
    public void getWorldListData(int uid,long lastID) {
        ArrayMap<String, Object> map = new ArrayMap<>();
        map.put("uid", uid);
        if (lastID!=DEFAULT_PRAM){
            map.put("last_id", lastID);
        }
        RetrofitManager.createApi2().getPublicFeeds(map)
                .compose(RxSchedulers.applySchedulers())
                .compose(mView.bindToLife())
                .subscribe(bean -> {
                    if (Util.getInstance().isRequestSuccess(bean, bean.getCode())) {
                        			mView.refreshWorldList(bean.getData().getHome_feeds(),bean.getData().getFeeds_cnt()
                                ,bean.getData().getLast_id());
                    } else {
                        mView.showFail(bean.getMsg());
                    }
                }, throwable -> {
                    mView.showFail(App.getInstance().getResources().getString(R.string.base_net_error_fail));
                });
    }
}
```

## mvvm

View

```kotlin
class LoginActivity : BaseActivity<ActivityLoginBinding>() {

    private val viewModel: LoginViewModel by viewModel()
    override fun getLayoutRes() = R.layout.activity_login

    override fun initView() {
        super.initView()
        mBinding.apply {
            vm = viewModel
          	//点击事件
            tvRegisterLogin.setOnClickListener {
                viewModel.repoLogin()
            }
        }
    }

    override fun initConfig() {
        super.initConfig()
        viewModel.apply {
          
            liveDataTest.observe(viewLifecycleOwner, Observer {
             ToastUtils.showShort("登录结果 " + rsp.toString())
                it?.let {
                   saveUserData(it)
                }
        			})
          
        }
    }
}
```



ViewModel

```kotlin
class LoginViewModel(private val resource: ILoginResource) : BaseViewModel() {

val liveDataTest = MutableLiveData<String>()//声明需要被观察的数据
  
  val liveDataRes = MutableLiveData<String>()//声明需要被观察的数据
    /**
     * 调用登录
     */
    internal fun repoLogin() {
        val account = obMobile.get() ?: return
        val password = obPassword.get() ?: return
        serverAwait {
             Retrofit.login(body)
            .serverData()
            .onSuccess {
                //只要不是接口响应成功，
                onError { code, message ->
                    ToastUtils.showShort("登录接口 BizError $code,$message")
                }
                onOK<LoginRsp> { code, data, message ->
                    _loginRsp.value = data
                }
            }.onFailure {
                ToastUtils.showShort("登录接口 异常 ${it.message}")
            }
        }
    }
   internal fun reginster() {
     liveDataRes
   }
}
```

## 源码

### LiveData和ComponentActivity的关系

ComponentActivity-->持有LifecycleRegistry对象，在activity不同生命周期，调用LifecycleRegistry.handleLifecycleEvent通知Lifecycle，感知生命周期变化

我们自定义实现LifecycleObserver就可以感知activity生命周期



liveData通过observe(viewLifecycleOwner）将Activity（viewLifecycleOwner）注册到--->LifecycleBoundObserver(owner, observer)，通过onActive();onInactive();通知数据是否显示



## ViewModel和ComponentActivity的关系

ViewModel-->在ComponentActivity() 构造方法通过lifecycle感知生命周期destory方法，



```java
getLifecycle().addObserver(new LifecycleEventObserver() {
    @Override
    public void onStateChanged(@NonNull LifecycleOwner source,
            @NonNull Lifecycle.Event event) {
        if (event == Lifecycle.Event.ON_DESTROY) {
            if (!isChangingConfigurations()) {
                getViewModelStore().clear();
            }
        }
    }
});
```



ComponentActivity实现了ViewModelStoreOwner接口，提供了getViewModelStore方法



ViewModelStore是存储ViewModel的类map集合存储



ViewModelStore在Activity中将Activity和ViewModel绑定

```kotlin
ViewModelProvider(this).get(HomeViewModel::class.java)
```



### ViewModel和LiveData的关系

ViewModel获取数据，LiveData处理数据

实现上：View(Activity)持有ViewModel,ViewModel持有LiveData,LiveData通知View(Activity)数据变化