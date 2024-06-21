import React, { useEffect, useState } from 'react';
import './Blogs.css';
import BlogCard from '../../components/BlogCard/BlogCard';
import { getAllBlogs, getAllTags } from '../../services/blogService';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogsData = await getAllBlogs();
                setBlogs(blogsData);
                const tagsData = await getAllTags();
                setTags(tagsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredBlogs = blogs.filter(blog => {
        return (
            (selectedTag === '' || blog.tag.includes(selectedTag)) &&
            (searchTerm === '' || blog.headline.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className='blog-container'>
            <div className="blog-header-section">
                <h2 className='page-heading'>Our Stories</h2>
                <div className="search-section">
                    <input 
                        type="search" 
                        placeholder='Search' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select 
                        aria-placeholder='Tags' 
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                    >
                        <option value=''>All</option>
                        {tags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="blog-content-section">
                {filteredBlogs.map(blog => (
                    <BlogCard
                        key={blog._id}
                        imageSrc={blog.image} 
                        headline={blog.headline}
                        description={blog.description}
                        authorName={blog.authorName}
                        date={formatDate(blog.date)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Blogs;
