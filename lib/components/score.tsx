
function Score({score}: any) {
    const hasHalfPoint = score % 1 !== 0;
    return (
        <div className='pie__score'>
            {
                Array.from({length: score}, (_, i) => (
                    <span key={i}>🎄</span>
                ))
            }
            {hasHalfPoint && <span>🌲</span>}
        </div>
    )
}

export {Score};