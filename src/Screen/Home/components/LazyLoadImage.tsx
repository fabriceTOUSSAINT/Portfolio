import styled from 'styled-components'

const imgCache: {
    __cache: any
    read: (src: any) => any
} = {
    __cache: {},
    read(src) {
        if (!this.__cache[src]) {
            this.__cache[src] = new Promise((resolve) => {
                const img = new Image()
                img.onload = () => {
                    this.__cache[src] = true
                    resolve(this.__cache[src])
                }
                img.src = src
            }).then((img) => {
                this.__cache[src] = true
            })
        }
        if (this.__cache[src] instanceof Promise) {
            throw this.__cache[src]
        }
        return this.__cache[src]
    },
}

interface LazyLoadImageProps {
    src: string
    isVisible: boolean
    flip?: boolean
}

export const LazyLoadImage = ({
    src,
    isVisible,
    flip = false,
    ...rest
}: LazyLoadImageProps) => {
    imgCache.read(src)

    return (
        <LazyLoadImageStyled
            src={src}
            isVisible={isVisible}
            flip={flip}
            alt="img"
            {...rest}
        />
    )
}

export default LazyLoadImage

const LazyLoadImageStyled = styled.img<{ isVisible?: boolean; flip?: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: auto;
    overflow: hidden;
    opacity: 0;
    z-index: -1;
    transition: all ease 0.2s;

    ${({ flip }) => {
        if (flip) {
            return `
                -webkit-transform: scaleX(-1);
                transform: scaleX(-1);
            `
        }

        return ``
    }}

    ${({ isVisible }) => {
        if (isVisible) {
            return `
                opacity: 1;
            `
        }
        return ``
    }}
`
