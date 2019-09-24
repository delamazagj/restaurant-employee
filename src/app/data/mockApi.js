import sampleData from './sampleData'
import sampleMenu from './sampleMenu'


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchSampleData = () => {
    return delay(1000).then(() => {
        return Promise.resolve(sampleData)
    })
}

export const fetchSampleMenu = () => {
    return delay(1000).then(() => {
        return Promise.resolve(sampleMenu)
    })
}