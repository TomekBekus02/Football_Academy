import classes from './member.module.css'
import Image from 'next/image';
import { IStaffMember } from "@/types/IStaffMember";

export default function member({
    name,
    age,
    photo,
    role,
    ageGroup,
}: IStaffMember) {
    return (
        <div className={classes.memberBox}>
            <Image
                src={photo}
                alt={`${name}'s photo`}
                width={400}
                height={500}
                className="imageStyle"
            />
            <div className={classes.DetailsBox}>
                <h2>
                    {name} {age}.l
                </h2>
                <h4>{role}</h4>
            </div>
            <div className={classes.ageGroupBox}>
                <div className={classes.ageGroupContent}>
                    <h3>{ageGroup}</h3>
                </div>
            </div>
        </div>
    );
}