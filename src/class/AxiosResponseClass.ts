export default class AxiosResponseClass{
    private data: string
    private headers: object
    private status: number
    constructor(
        data: string,
        headers: object,
        status: number
    ) {
        this.data = data
        this.headers = headers
        this.status = status
    }

    public get Data() { return this.data}
    public get Headers() { return this.headers }
    public get Status() { return this.status}
}