import styled from 'styled-components'

const ResponsiveTemplate = styled.div`
    padding: 0 1rem;
    width: 1024px;
    margin: 0 auto;

    @media (max-width: 1024px) {
        width: 768px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`
// 12px == 0.75rem;
// 16px == 1rem;

// JavaScript rest
const Responsive = ({children, ...rest}) => {
    return (
        <ResponsiveTemplate {...rest}>
            {children}
        </ResponsiveTemplate>
    )
}

export default Responsive;