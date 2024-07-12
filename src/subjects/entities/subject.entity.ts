import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subjects')
export class Subject {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ type:'text', unique: true })
    title:string;

    @Column({ type:'text', unique: true })
    slug:string;

    @Column({type:'text', array:true, default:[]})
    tags:string[];

    @BeforeInsert()
    checkSlugInsert() {
        if ( !this.slug ) {
            this.slug =  this.title.toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
        }
        this.slug =  this.slug.toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '')
    }    

    @BeforeUpdate()
    checkSlugUpdate() {
        this.checkSlugInsert();
    }
    
}
