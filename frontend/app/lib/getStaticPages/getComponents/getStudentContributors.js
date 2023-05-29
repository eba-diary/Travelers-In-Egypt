export function getStudentContributors(fields) {
    return {
        type: 'student-contributors',
        fields: {
            title: fields.title,
            studentCollapse: fields.studentCollapse.map((entry) => {
                return {
                    title: entry.fields.title,
                    contributor: entry.fields.contributor.map((entry) => {
                        return {
                            ...entry.fields
                        }
                    })
                }
            })
        }
    }
}