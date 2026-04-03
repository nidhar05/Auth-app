"use client";

import {
    Counter,
    FetchData,
    Profile,
    AuthProvider,
    ReducerCounter,
    FocusInput,
    ExpensiveCalc,
    CallbackExample,
    ToggleComponent,
    LayoutEffectExample,
    Parent,
    Items,
    StoreProvider,
} from "@/app/components/hooks/hooks";

export default function Page() {
    return (
        <AuthProvider>
            <div style={container}>
                <h1>All Hooks Demo</h1>

                <Section title="useState">
                    <Counter />
                </Section>

                <Section title="useEffect">
                    <FetchData />
                </Section>

                <Section title="useContext">
                    <Profile />
                </Section>

                <Section title="useReducer">
                    <ReducerCounter />
                </Section>

                <Section title="useRef">
                    <FocusInput />
                </Section>

                <Section title="useMemo">
                    <ExpensiveCalc />
                </Section>

                <Section title="useCallback">
                    <CallbackExample />
                </Section>

                <Section title="Custom Hook">
                    <ToggleComponent />
                </Section>

                <Section title="useLayoutEffect">
                    <LayoutEffectExample />
                </Section>

                <Section title="useImperativeHandle">
                    <Parent />
                </Section>

                <Section title="forwardRef">
                    <StoreProvider>
                        <Items />
                    </StoreProvider>
                </Section>

            </div>
        </AuthProvider>
    );
}

function Section({ title, children }) {
    return (
        <div style={{ marginBottom: "40px" }}>
            <h2 style={{ color: "#600000" }}>{title}</h2>
            {children}
            <hr />
        </div>
    );
}

const container = {
    padding: "20px",
    minHeight: "100vh",
    background: "#6075aa",
    color: "white",
};