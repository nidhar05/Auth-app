import {
    useState,
    useEffect,
    useContext,
    createContext,
    useReducer,
    useRef,
    useMemo,
    useCallback,
    useLayoutEffect,
    useImperativeHandle,
    forwardRef
} from "react";

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}

export function FetchData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(json => setData(json));
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            {data.slice(0, 5).map(item => (
                <p key={item.id}>{item.title}</p>
            ))}
        </div>
    );
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (name) => setUser(name);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function Profile() {
    const { user, login, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>User: {user || "Guest"}</h2>
            <button onClick={() => login("Nidharshana")}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

export function ReducerCounter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <h2>Reducer Count: {state.count}</h2>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        </div>
    );
}

export function FocusInput() {
    const inputRef = useRef();

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} placeholder="Click button to focus" />
            <button onClick={focusInput}>Focus</button>
        </div>
    );
}

export function ExpensiveCalc() {
    const [num, setNum] = useState(0);
    const [toggle, setToggle] = useState(false);

    const expensive = useMemo(() => {
        console.log("Calculating...");
        return num * 2;
    }, [num]);

    return (
        <div>
            <h2>Result: {expensive}</h2>
            <h3>{toggle ? "ON" : "OFF"}</h3> 

            <button onClick={() => setNum(num + 1)}>Increase</button>
            <button onClick={() => setToggle(!toggle)}>Toggle</button>
        </div>
    );
}

export function CallbackExample() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        console.log("Clicked");
    }, []);

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={handleClick}>Log</button>
        </div>
    );
}

function useToggle(initial = false) {
    const [state, setState] = useState(initial);

    const toggle = () => setState(prev => !prev);

    return [state, toggle];
}

export function ToggleComponent() {
    const [isOn, toggle] = useToggle();

    return (
        <div>
            <h2>{isOn ? "ON" : "OFF"}</h2>
            <button onClick={toggle}>Toggle</button>
        </div>
    );
}

export function LayoutEffectExample() {
    const boxRef = useRef();

    useLayoutEffect(() => {
        console.log(boxRef.current.getBoundingClientRect());
    }, []);

    return <div ref={boxRef}>Measure Me</div>;
}

const Child = forwardRef((props, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus(),
    }));

    return <input ref={inputRef} />;
});

export function Parent() {
    const childRef = useRef();

    return (
        <div>
            <Child ref={childRef} />
            <button onClick={() => childRef.current.focus()}>
                Focus Child
            </button>
        </div>
    );
}

const StoreContext = createContext();

const reducer2 = (state, action) => {
    switch (action.type) {
        case "add":
            return [...state, action.payload];
        default:
            return state;
    }
};

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer2, []);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export function Items() {
    const { state, dispatch } = useContext(StoreContext);

    return (
        <div>
            <button onClick={() => dispatch({ type: "add", payload: "Item" })}>
                Add Item
            </button>
            {state.map((item, i) => (
                <p key={i}>{item}</p>
            ))}
        </div>
    );
}
