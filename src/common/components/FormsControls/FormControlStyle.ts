type paramType = {
    type: 'div' | 'textarea'
    hasError?: boolean
}

export const defaultStyle = ({ type, hasError }: paramType) => {
    switch (type) {
        case 'div': return {
            backgroundColor: 'grey',
            padding: '10px',
            fontSize: '16px'
        }
        case 'textarea': return {
            padding: '5px',
            fontSize: '16px',
            width: '250px',
            height: '50px',
            borderRadius: '5px',
            border: hasError ? '1px solid red' : '1px solid transparent'
        }
    }
}