/* Pool đã được xáo trộn và ưu tiên các câu chưa học/chưa chắc. */
window.DanhGrade7Round = {
  select(pool, length = 10) {
    const required = pool.filter(item => item.type === 'rewrite').slice(0, 2);
    const others = pool.filter(item => !required.includes(item));
    return [...required, ...others.slice(0, Math.max(0, length - required.length))].slice(0, length);
  }
};
