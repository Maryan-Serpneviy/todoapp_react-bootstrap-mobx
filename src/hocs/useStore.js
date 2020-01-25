import { observer, inject } from 'mobx-react'

export default function(Component, store = 'store') {
    return inject(store)(observer(Component))
}

// import { useContext } from 'react'
// import { MobXProviderContext, useObserver } from 'mobx-react'

// export default function inject(selector, baseComponent) {
//     const component = ownProps => {
//         const store = useContext(MobXProviderContext)
//         return useObserver(() => baseComponent(selector({ store, ownProps })))
//     }
//     component.displayName = baseComponent.name
//     return component
// }
