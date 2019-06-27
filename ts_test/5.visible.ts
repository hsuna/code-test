class React{}

//@visible
class Component extends React{
    super(){

    }
}

class ComponentVisible extends React{
    state={
        visible: true
    }
    
    render(){
        return this.state.visible ? ('<div />') : null
    }
}


function visible(WrappedComponent) {
    return class extends WrappedComponent{
        state={
            visible: true
        }
        render(){
            return false === this.state.visible
            ? null
            : super.render()
        }
    }
}