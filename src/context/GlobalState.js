import GlobalContext from './GlobalContext';

const GLobalState = (props) => {
    const state = {
        "name": "dionna",
        "class": "5b"
    }
    return (
        <>
            <GlobalContext.Provider name={state}>
                {props.children}
            </GlobalContext.Provider>
        </>
    )
}

export default GlobalContext;