export const getCountOwner = (count: number): string => {
    return count > 5 ? `${count} владельцев` : count > 1 ? `${count} владельца` : `${count} владелец`;
};
