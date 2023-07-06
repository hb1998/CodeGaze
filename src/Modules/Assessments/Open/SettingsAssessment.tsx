const SettingsAssessments =()=>{
    return(
            <div style={{display:'flex', flexDirection:"row", alignItems:"" }}> hello Settings
                <div >
                    <h1>Assessment settings</h1>
                    <header>Templates</header>
                    <div style={{display:'flex', flexDirection:"column"}}>
                    <select><option>Default email templates</option></select>
                    <select><option>Default welcome templates</option></select>
                    </div>
                    <header>Time Limit</header>
                    <select><option>No hour limit</option></select>
                    <select><option>No minute Limit</option></select>

                </div>
                <div>
                 <h1> Candidate settings</h1>
                 <header>Link settings</header>
                </div>
            </div>
            )
}

export default SettingsAssessments