export default function Dropdown ({name, onChangeState, poemsData, setIsLoading}) {

    // console.log('poems data',poemsData)

    return (
        <select className="form-select"
                onKeyDown={(event) => {onChangeState(event.target.value); setIsLoading(true)}}
                onChange={(event) => {onChangeState(event.target.value); setIsLoading(true)}}
                aria-label="Default select example">
            <option selected>{name}</option>
            {
                poemsData?.map((poemsData) => {
                    // console.log(poemsData)
                    return (
                        <option value={poemsData}>{poemsData.slice(0,30)}</option>
                    )
                })
            }

        </select>
    )
}