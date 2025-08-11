import classes from './member.module.css'
import Image from 'next/image';

type StaffMember = {
  name: string;
  age: number;
  photo: string;
  role: string;
  ageGroup: string;
};

export default function member({name, age, photo, role, ageGroup}:StaffMember){
  return(
    <div className={classes.memberBox}>
          <Image 
            src={photo} 
            alt={`${name}'s photo`}
            width={480}
            height={580}
            className={classes.memberPhoto}
          />
        <div className={classes.DetailsBox}>
          <h2>{name} {age}.l</h2>
          <h4>{role}</h4>
        </div>
        <div className={classes.ageGroupBox}>
          <h3>{ageGroup}</h3>
        </div>
      </div>
  )
}