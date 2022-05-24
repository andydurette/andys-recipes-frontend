import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';


function Profile(props:any) {
    const {userData} = props;

    const [userProfileData, setUserProfileData] = useState<any | undefined>(undefined);

    const getUserAttributes = async (user:any) => {
        const result = [];
        const attributes = await Auth.userAttributes(user);
        result.push(...attributes);
        console.log('gimme userAttributes', result)
        setUserProfileData(result);
    }

    const renderUserAttributes = (userProfileDataValues:any) => {
        console.log('gimme userProfileDataValues', userProfileDataValues)
        const rows = [];
        for (const userAttribute of userProfileDataValues) {
            rows.push(<tr key={userAttribute.Name}>
                <td>{userAttribute.Name}</td>
                <td>{userAttribute.Value}</td>
            </tr>)
        }
        return <table>
            <tbody>
               {rows} 
            </tbody>
        </table>
    }


    useEffect(() => {
        getUserAttributes(userData);
    },[userData]);
    
    
    return (
        <div>
            <h1>This is the profile page</h1>
            {userProfileData && 
                renderUserAttributes(userProfileData)
            }
         </div>  
    )
}

export default Profile