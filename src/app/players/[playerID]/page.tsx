
export default function player({ params }: {params: {playerID: string}}){
    return(
        <div>
            <h1>Player o ID: {params.playerID}</h1>
        </div>
    )
}