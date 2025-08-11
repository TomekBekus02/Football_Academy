import { staffData } from '@/data/staffData'
import classes from './staff.module.css'
import Member from './member/member'

type StaffMember = {
  id: number;
  name: string;
  age: number;
  photo: string;
  role: string;
  ageGroup: string;
};

export default function Staff(){
    return(
        <div className={classes.staffBox}>
            <div className={classes.staffContent}>
                {
                    staffData.map((member: StaffMember) => {
                        return(
                            <Member 
                                key={member.id}
                                name={member.name} 
                                age={member.age} 
                                photo={member.photo} 
                                role={member.role} 
                                ageGroup={member.ageGroup} 
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}