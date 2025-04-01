import { useState, useEffect } from 'react';
import * as hootService from '../../services/hootService';
// import { show } from '../../services/hootService'; // best way to import
import { useParams } from 'react-router';

const HootDetails = (props) => {
    const [hoot, setHoot] = useState();
    const { hootId } = useParams();
    
    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await hootService.show(hootId);
            setHoot(hootData);
        }
        fetchHoot(); // this will run when the effect function runs
        // the effect function runs when we have a hootId

    }, [hootId]);

    console.log('hoot state: ', hoot)

    return <main>Hoot Details</main>
};

export default HootDetails;